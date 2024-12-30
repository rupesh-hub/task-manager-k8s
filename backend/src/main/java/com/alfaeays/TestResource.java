package com.alfaeays;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tests")
public class TestResource {

    @GetMapping
    public String test() {
        return "This is a test endpoint.";
    }
}
