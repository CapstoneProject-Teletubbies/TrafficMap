package teletubbies.map.bus;

import lombok.Data;

@Data
public class BusInfoDto {
    //버스 번호로 버스 정보
    public Integer ROUTEID; // 노선 ID
    public Integer ROUTETPCD; // 노선 유형코드
    public Object FBUS_DEPHMS; // 첫차 시간
    public Object LBUS_DEPHMS; // 막차 시간
    public Integer MIN_ALLOCGAP; //최소 배차간격
    public Integer MAX_ALLOCGAP; //최대 배차간격
    public Integer TURN_BSTOPID; //회차지 정류소 ID
    public String TURN_BSTOPNM; // 회차지 정류소명
    public Integer ORIGIN_BSTOPID; // 기점 정류소 ID
    public String ORIGIN_BSTOPNM; // 기점 정류소 명
    public Integer DEST_BSTOPID; //종점 정류소 ID
    public String DEST_BSTOPNM; // 종점 정류소명
}
