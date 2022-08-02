package teletubbies.map.subway;

import lombok.Data;

@Data
public class ToiletDto { // 장애인화장실 Dto
    private Long diapExchNum; //기저귀교환대개수
    private String dtlLoc; //상세위치
    private String exitNo; //출구번호
    private String gateInotDvNm; //게이트내외구분
    private String grndDvNm; //지상구분
    private String mlFmlDvNm; //남녀구분
    private Long stinFlor; //역층
    private Long toltNum; //화장실개수
}
