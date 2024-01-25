package com.kh.app.adoption.vo;

import lombok.Data;

@Data
public class AdoptionVo {
	
	private String adoptionBoardNo;
	private String imageNo;
	private String rescueDogNo;
	private String adminNo;
	private String enrollDate;
	private String modifyDate;
	private String delYn;
	private String imagePath;  // FullPath 대신 imagePath로 변경
	
	private String dogName; 	// 개 이름
    private String breed;		// 견종
    private String genderMf; 	// 성별
    private String neuteringOx; // 중성화 여부
    private String age; 		// 나이
    private String weight; 		// 몸무게
    private String adoptionCompleteYn;
    private String quitDate;

}
