package teletubbies.map.find;

import lombok.Data;

@Data
public class FindDto {

    //검색 정보
    public String result;
    //Result Detail
    public String building; //건물 이름
    public String address; //주소

    //엘리베이터 표시
    public String elevatorState; //엘리베이터 유무, 점검중까지
    public float centerLat; //위도
    public float centerLon; //경도

    //버스 표시는 BusDto 사용하면 될 듯
}
