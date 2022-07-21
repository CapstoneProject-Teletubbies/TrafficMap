package teletubbies.map.bus;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class BusRouteListDto {
    // 노선 ID로 버스 정류소 목록 검색
    public String BSTOPNM; // 정류장 이름
    public int BSTOPID; // 정류소 ID
    public int SHORT_BSTOPID; // 단축 정류소ID
    public int PATHSEQ; // 노드 순번
    public int BSTOPSEQ; // 정류소 순번
    public int DIRCD; // 방향코드(0:상행, 1:하행, 2:순환)
    public BigDecimal POSX; // X 좌표
    public BigDecimal POSY; // Y 좌표
}
