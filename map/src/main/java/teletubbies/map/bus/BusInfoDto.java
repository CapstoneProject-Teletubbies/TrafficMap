package teletubbies.map.bus;

import lombok.Data;

@Data
public class BusInfoDto {
    //버스 번호로 버스 정보
    private Object ROUTENO; //노선번호;
    private Integer ROUTEID; // 노선 ID
    private Integer ROUTETPCD; // 노선 유형코드
    private Object FBUS_DEPHMS; // 첫차 시간
    private Object LBUS_DEPHMS; // 막차 시간
    private Integer MIN_ALLOCGAP; //최소 배차간격
    private Integer MAX_ALLOCGAP; //최대 배차간격
    private Integer TURN_BSTOPID; //회차지 정류소 ID
    private String TURN_BSTOPNM; // 회차지 정류소명
    private Integer ORIGIN_BSTOPID; // 기점 정류소 ID
    private String ORIGIN_BSTOPNM; // 기점 정류소 명
    private Integer DEST_BSTOPID; //종점 정류소 ID
    private String DEST_BSTOPNM; // 종점 정류소명
}
