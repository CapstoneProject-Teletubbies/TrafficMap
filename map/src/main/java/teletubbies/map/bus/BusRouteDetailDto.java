package teletubbies.map.bus;

import lombok.Data;

@Data
public class BusRouteDetailDto {
    public Integer ROUTEID; // 버스 노선 고유번호
    public Object ROUTENO; // 노선 명
    public Integer ROUTETPCD; // 노선유형코드 [1:지선형, 2:간선형, 3:좌석형, 4:광역형, 5:리무진, 6:마을버스, 7:순환형, 8:급행간선, 9:지선(순환)]
    public Object FBUS_DEPHMS; // 첫차 시간 hhmm
    public Object LBUS_DEPHMS; // 막차 시간 hhmm
    public Object MIN_ALLOCGAP; // 	최소 배차간격
    public Object MAX_ALLOCGAP; // 최대 배차간격
    public Integer TURN_BSTOPID; // 회차지 정류소ID
    public String TURN_BSTOPNM; // 회차지 정류소명
    public Integer ORIGIN_BSTOPID; // 기점 정류소ID
    public String ORIGIN_BSTOPNM; // 기점 정류소명
    public Integer DEST_BSTOPID; // 종점 정류소ID
    public String DEST_BSTOPNM; // 종점 정류소명
}
