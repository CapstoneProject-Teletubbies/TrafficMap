package teletubbies.map.subway;

import lombok.Data;

@Data
public class SubwayDto {

    public int subwayId;
    public String subwayName; //이름 ex) 부평구청역 7호선

    //up, down
    public String destination; //목적지 ex) 장암행
    public String time; // 시간 ex) 10분

    public boolean isElevator; //엘리베이터 유무
    public boolean isWheelchair; //장애인화장실 유무
}
