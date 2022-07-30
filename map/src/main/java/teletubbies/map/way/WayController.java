
package teletubbies.map.way;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import teletubbies.map.subway.SubwayDto;

import java.util.List;

@RestController
@RequestMapping("/api")
public class WayController {
    @Autowired
    WayServiceImpl wayService;

    @GetMapping("/way")
//    @RequestMapping(value="/way", method = {RequestMethod.POST})
    public Object FindWay() { //(startX, startY, endX, endY, startName, endName)) {
        double startX = 127.108212;
        double startY = 37.402056;
        double endY = 37.49159726;
        double endX = 126.72449073;
        String startName = "카카오판교오피스";
        String endName = "스타벅스부평";
        return wayService.findWay(startX, startY, endX, endY, startName, endName);
    }
}
