package teletubbies.map.bus;

import lombok.Data;

@Data
public class BusLocationDto {
    //  RouteID로 버스 위치
    private Integer BUSID; // 버스 ID
    private String BUS_NUM_PLATE; // 차량 번호
    private Integer LOW_TP_CD; // 저상버스 여부 (0:일반, 1:저상)
    private Integer DIRCD; // 진행방향코드(0:상행, 1:하행, 2:순환)
    private Integer PATHSEQ; // 노드 순번
    private Integer LATEST_STOPSEQ; // 최근 정류소순번
    private Integer LATEST_STOP_ID; // 최근 정류소ID
    private String LATEST_STOP_NAME; // 최근 정류소 명
    private Integer REMAIND_SEAT; // 차량 빈자리 수(255:사용안함)
    private Integer CONGESTION; // 혼잡도(1:여유, 2:보통, 3:혼잡, 255:사용안함)
    private Integer LASTBUSYN;
}
