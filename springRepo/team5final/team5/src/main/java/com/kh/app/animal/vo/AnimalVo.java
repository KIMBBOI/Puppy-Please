package com.kh.app.animal.vo;

import lombok.Data;

@Data
public class AnimalVo {
	
	private String no;
	private String imageNo;
	private String name;
	private int age;
	private String weight;
	private String breed;			// ����
	private String genderMf;
	private String admissionDate;	// �Լ���
	private String quitDate;		// �����
	private String inoculationOx;	// ��������
	private String neuteringOx;		// �߼�ȭ����
	private String delYn;

	
}
