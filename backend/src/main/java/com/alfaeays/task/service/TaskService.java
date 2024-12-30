package com.alfaeays.task.service;

import com.alfaeays.shared.GlobalResponse;
import com.alfaeays.task.mapper.TaskMapper;
import com.alfaeays.task.model.TaskRequest;
import com.alfaeays.task.model.TaskResponse;
import com.alfaeays.task.repository.TaskRepository;
import com.alfaeays.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static java.lang.String.format;

@RequiredArgsConstructor
@Service
public class TaskService implements ITaskService {

    private final TaskRepository taskRepository;

    @Override
    public GlobalResponse<TaskResponse> create(final TaskRequest request) {
        String email = authenticatedUser().getUsername();
        var task = TaskMapper.toEntity(request);
        task.setCreatedBy(email);
        task.setCreatedOn(new Date());

        return Optional.ofNullable(taskRepository.save(task))
                .map(TaskMapper::toResponse)
                .map(GlobalResponse::success)
                .orElseThrow(() -> new IllegalStateException("Error creating task."));
    }

    @Override
    public GlobalResponse<TaskResponse> update(TaskRequest request, Long taskId) {
        final String email = authenticatedUser().getUsername();
        var task = taskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalStateException("Task not found."));

        if (!request.getTitle().isEmpty()) task.setTitle(request.getTitle());
        if (!request.getDescription().isEmpty()) task.setDescription(request.getDescription());
        if (request.getDueDate() != null) task.setDueDate(request.getDueDate());
        if (request.getStatus() != null) task.setStatus(request.getStatus());
        task.setModifiedBy(email);
        task.setModifiedOn(new Date());

        return Optional.ofNullable(taskRepository.save(task))
                .map(TaskMapper::toResponse)
                .map(GlobalResponse::success)
                .orElseThrow(() -> new IllegalStateException("Error updating task."));
    }

    @Override
    public GlobalResponse<Void> delete(final Long taskId) {
        final String email = authenticatedUser().getUsername();
        var task = taskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalStateException("Task not found."));

        if (!task.getCreatedBy().equalsIgnoreCase(email)) {
            throw new IllegalStateException("Error deleting task.");
        }
        taskRepository.delete(task);
        return GlobalResponse.success(format("Task deleted success. [%s]", taskId), null);
    }

    @Override
    public GlobalResponse<TaskResponse> getById(final Long taskId) {
        return taskRepository.findById(taskId)
                .map(TaskMapper::toResponse)
                .map(GlobalResponse::success)
                .orElseThrow(() -> new IllegalStateException("Task not found."));
    }

    @Override
    public GlobalResponse<List<TaskResponse>> getAll() {
        final String email = authenticatedUser().getUsername();
        List<TaskResponse> taskResponses = taskRepository.findAllByCreator(email)
                .stream()
                .map(TaskMapper::toResponse)
                .collect(Collectors.toList());

        return GlobalResponse.success(Optional.ofNullable(taskResponses).filter(list -> !list.isEmpty()).orElse(Collections.emptyList()));
    }

    public static User authenticatedUser() {
        return Optional.ofNullable(SecurityContextHolder.getContext().getAuthentication())
                .filter(Authentication::isAuthenticated)
                .map(Authentication::getPrincipal)
                .filter(principal -> principal instanceof User)
                .map(principal -> (User) principal)
                .orElse(null);
    }

}
