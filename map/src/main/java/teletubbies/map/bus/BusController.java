package teletubbies.map.bus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class BusController {
    @Autowired
    private BusServiceImpl busService;
    @GetMapping("/bus")
    public Object GetBusInfo() {
        String BusStopName = "롯데백화점";
        return busService.findBusStopByBusStopName(BusStopName);

    }
}
