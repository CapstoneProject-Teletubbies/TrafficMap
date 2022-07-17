package teletubbies.map.subway;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class SubwayController {
    @Autowired
    SubwayServiceImpl subwayService;

    @GetMapping("/subway")
    public Object Subway() {
        int start = 0;
        int end = 5;
        String name = "송내";
        return subwayService.findSubwayByStopName(start, end, name);
    }

}
