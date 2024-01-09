package com.kh.app.animal.vo;

import lombok.Data;

@Data
public class AnimalVo {
	
	private String no;
	private String imageNo;
	private String name;
	private int age;
	private String weight;
	private String breed;			// 견종
	private String genderMf;
	private String admissionDate;	// 입소일
	private String quitDate;		// 퇴소일
	private String inoculationOx;	// 접종여부
	private String neuteringOx;		// 중성화여부
	private String delYn;

	
}
