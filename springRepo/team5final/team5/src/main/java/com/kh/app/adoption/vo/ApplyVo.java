package com.kh.app.adoption.vo;

import lombok.Data;

@Data
public class ApplyVo {
	private String ApplyNo;
	private String memberNo;
	private String rescueDogNo;
	private String decisionTime;
	private String mainReason;
	private String familyMembers;
	private String currentPets;
	private String landlordPermissionYN;
	private String conflictResolution;
	private String enrollDate;
}
