package teletubbies.map.find;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FindDto {
    //티맵 API
    private String name; //건물 이름(시설물 명칭)

    //위도, 경도
    private double Latitude; //위도
    private double Longitude; //경도

    //주소
    private String fullAddressRoad; // 도로명 주소(이걸 엘리베이터 찾을 때 써야할듯)
    //도로명주소 자르기 ex) 부평구 부평문화로 35
    private String middleAddrName; // ㅇㅇ구
    private String roadName; //도로명 주소 (ex 부평문화로)
    private String firstBuildNo;  //건물번호? (ex 35)

    //업종명
    private String bizName; // 업종명
    private String upperBizName; //업종명 대분류(bizName이 "" 일 수도 있어서)

    // 엘리베이터 API
    private String elevatorState; //엘리베이터 유무, 점검중까지(elvtrSttsNm)
}
