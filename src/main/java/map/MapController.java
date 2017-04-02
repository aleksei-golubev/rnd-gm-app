package map;

import java.util.Random;
import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.*;
import org.springframework.stereotype.*;
import org.springframework.web.bind.annotation.*;

@Controller
@EnableAutoConfiguration
public class MapController {
    @RequestMapping(value = "/position/random", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public Position random()
    {
        Random rand = new Random();

        float lat = rand.nextFloat() * 180 - 90,
              lng = rand.nextFloat() * 360 - 180;

        Position position = new Position(lat, lng);


        return position;
    }

    public static void main(String[] args) throws Exception {
        SpringApplication.run(MapController.class, args);
    }
}