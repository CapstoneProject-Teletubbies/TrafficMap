package teletubbies.map.bus;

import lombok.Data;

@Data
public class BusArrivalDto {
    // 버스 도착예정
    private Integer ROUTEID; // 노선 ID(버스 노선 고유번호)
    private Integer BUSID; // 버스 ID(차량 고유번호)
    private String BUS_NUM_PLATE; // 차량 번호
    private Integer REST_STOP_COUNT; // 몇 정거장 전
    private Integer ARRIVALESTIMATETIME; // 도착예정시간(몇 초 전)
    private Integer LATEST_STOP_ID; //버스의 최근 정류소 ID
    private String LATEST_STOP_NAME; //버스의 최근 정류소 명
    private Integer DIRCD; // 진행방향코드(0:상행, 1:하행, 2:순환)
    private Integer LOW_TP_CD; // 저상버스 여부(0:일반, 1:저상)
    private Integer REMAIND_SEAT; // 차량 빈자리 수 (255:사용안함)
    private Integer CONGESTION; // 혼잡도 (1:여유, 2:보통, 3:혼잡,  255:사용안함)
    private Integer LASTBUSYN; // 막차코드 (0:일반 1:막차)

}
