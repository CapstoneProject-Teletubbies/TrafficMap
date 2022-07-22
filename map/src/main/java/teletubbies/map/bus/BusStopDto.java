package teletubbies.map.bus;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class BusStopDto {
    public Integer BSTOPID; // 정류소 ID
    public Integer SHORT_BSTOPID; // 단축 정류소ID
    public String BSTOPNM; // 정류소명
    public BigDecimal POSX; // X좌표
    public BigDecimal POSY; // Y좌표

}
