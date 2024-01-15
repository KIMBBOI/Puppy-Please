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

}
