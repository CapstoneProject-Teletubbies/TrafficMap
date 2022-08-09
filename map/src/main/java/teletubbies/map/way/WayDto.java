package teletubbies.map.way;

import lombok.Data;

import java.util.ArrayList;

@Data
public class WayDto {
    //point
    private Double pointLongitude;  //경도
    private Double pointLatitude;  //위도

    private Number totalDistance; // 경로 총 길이(단위:m)
    private Number totalTime; //경로 총 소요시간(단위: 초)

    private Long pointIndex; // 안내지점 순번
    private String pointDescription;  // 길 안내 정보
    private Number turnType; // 회전정보
    private String pointType; //지점
    private String pointFacilityType; //시설물 정보

    //line
    private ArrayList<WayLinePointDto> linePointArray;
    private Long lineIndex; // 구간 순번
    private String lineDescription;  // 길 안내 정보
    private Number distance; // 구간거리
    private Number time;  // 구간 소요시간
    private Number roadType; //도로 타입 정보
    private String lineFacilityType; //시설물 정보

    //stair
    private Boolean isStair;


}
