package com.kh.app.adoptionnews.vo;

import lombok.Data;

@Data
public class AdoptionNewsVo {
	
	private String newsAfterAdoptionNo; 
	private String memberNo;
	private String imageNo;
	private String title;
	private String content;
	private String enrollDate;
	private String modifyDate;
	private String delYn;
	private String imagePath;  // FullPath 대신 imagePath로 변경
	private String writerNick;

}
