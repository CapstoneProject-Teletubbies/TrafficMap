package teletubbies.map.find;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/find")
public class FindController {

    @GetMapping("/address")
    public String address() {
        System.out.println("지도API 테스트");

        return "address";
    }

}
