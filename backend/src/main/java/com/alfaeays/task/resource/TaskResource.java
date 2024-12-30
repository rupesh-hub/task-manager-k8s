package com.alfaeays.task.resource;

import com.alfaeays.shared.GlobalResponse;
import com.alfaeays.task.model.TaskRequest;
import com.alfaeays.task.model.TaskResponse;
import com.alfaeays.task.service.ITaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskResource {

    private final ITaskService taskService;

    @PostMapping
    public ResponseEntity<GlobalResponse<TaskResponse>> create(@RequestBody TaskRequest request) {
        return new ResponseEntity<>(taskService.create(request), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GlobalResponse<TaskResponse>> update(
            @RequestBody TaskRequest request,
            @PathVariable Long id
    ) {
        return new ResponseEntity<>(taskService.update(request, id), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<GlobalResponse<List<TaskResponse>>> getAll() {
        return new ResponseEntity<>(taskService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GlobalResponse<TaskResponse>> getById(
            @PathVariable Long id
    ) {
        return new ResponseEntity<>(taskService.getById(id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id) {
        return new ResponseEntity<>(taskService.delete(id), HttpStatus.OK);
    }

}
