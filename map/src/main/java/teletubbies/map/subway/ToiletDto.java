package teletubbies.map.subway;

import lombok.Data;

@Data
public class ToiletDto { // 장애인화장실 Dto
    private String dtlLoc; //상세위치
    private String exitNo; //출구번호
    private Long stinFlor; //역층
    private Long toltNum; //화장실개수
}
