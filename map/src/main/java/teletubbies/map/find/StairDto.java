package teletubbies.map.find;

import lombok.Data;

@Data
public class StairDto { // 계단
    private Long objectid; // id
    private String ctprvnnm; // 인천광역시
    private String signgunm; // ㅇㅇ구
    private String signgucode; // 우편번호
    private String rdnmadr; // 도로명주소
    private String lnmadr; // 지명주소
    private Double startlatitude; // 시작위도
    private Double startlongitude; // 시작경도
    private Double endlatitude; // 끝위도
    private Double endlongitude; //끝경도

}
