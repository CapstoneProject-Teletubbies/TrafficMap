package teletubbies.map.subway;

import lombok.Data;

@Data
public class WheelchairDto { // 휠체어리프트 Dto
    private Long bndWgt; // 한계중량
    private String dtlLoc; // 상세위치
    private String exitNo; // 출구번호
    private String grndDvNmFr; // 운행시작(지상/지하)
    private String grndDvNmTo; // 운행종료(지상/지하)
    private Long len; // 길이
    private Long runStinFlorFr; // 운행시작층
    private Long runStinFlorTo; // 운행종료층
    private Long wd; // 폭
}
