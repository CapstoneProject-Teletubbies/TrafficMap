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
    private Number Latitude; //위도
    private Number Longitude; //경도

    //주소
//    private String upperAddrName;
//    private String middleAddrName;
//    private String lowerAddrName;
//    private String detailAddrName;
    private String fullAddressRoad; // 도로명 주소(이걸 엘리베이터 찾을 때 써야할듯)

    private String bizName; // 업종명

    // 엘리베이터 API
    private String elevatorState; //엘리베이터 유무, 점검중까지(elvtrSttsNm)
}
