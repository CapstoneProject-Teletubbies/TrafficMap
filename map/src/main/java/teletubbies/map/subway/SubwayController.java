package teletubbies.map.subway;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SubwayController {
    @Autowired
    SubwayServiceImpl subwayService;

//    @GetMapping("/subway")
    @RequestMapping(value="/subway", method = {RequestMethod.POST})
    public List<SubwayDto> GetSubwayInfo(int start, int end, String name) {
//        int start = 0;
//        int end = 5;
//        String name = "테스트";
        return subwayService.findSubwayByStopName(start, end, name);
    }

}
