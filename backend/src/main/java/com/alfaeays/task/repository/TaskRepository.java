package com.alfaeays.task.repository;

import com.alfaeays.task.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    @Query("SELECT T FROM Task T WHERE LOWER(T.createdBy) = LOWER(:email)")
    List<Task> findAllByCreator(String email);
}
