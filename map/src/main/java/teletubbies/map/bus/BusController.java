package teletubbies.map.bus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.net.MalformedURLException;

@RestController
@RequestMapping("/api")
public class BusController {
    @Autowired
    private BusServiceImpl busService;

    @GetMapping(value = "/bus",produces="text/plain;charset=UTF-8")
    public Object GetBusInfo() {
        String BusStopName = "부평역";
        return busService.findBusStopByBusStopName(BusStopName);

    }
}
