package teletubbies.map.bus;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class BusRouteListDto {
    // 노선 ID로 버스 정류소 목록 검색
    private String BSTOPNM; // 정류장 이름
    private int BSTOPID; // 정류소 ID
    private int SHORT_BSTOPID; // 단축 정류소ID
    private int PATHSEQ; // 노드 순번
    private int BSTOPSEQ; // 정류소 순번
    private int DIRCD; // 방향코드(0:상행, 1:하행, 2:순환)
    private BigDecimal POSX; // X 좌표
    private BigDecimal POSY; // Y 좌표
}
