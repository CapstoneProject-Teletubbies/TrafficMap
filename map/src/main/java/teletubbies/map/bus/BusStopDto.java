package teletubbies.map.bus;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class BusStopDto {
    private Integer BSTOPID; // 정류소 ID
    private Integer SHORT_BSTOPID; // 단축 정류소ID
    private String BSTOPNM; // 정류소명
    private BigDecimal POSX; // X좌표
    private BigDecimal POSY; // Y좌표

}
