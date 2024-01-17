package com.kh.app.adoptionnews.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.kh.app.adoptionnews.dao.AdoptionNewsDao;
import com.kh.app.adoptionnews.vo.AdoptionNewsVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdoptionNewsService {
	
	private final AdoptionNewsDao dao;
	private final SqlSessionTemplate sst;

	
	//사진 업로드
	public int insert(AdoptionNewsVo imgVo) {
		String str = imgVo.getImagePath().replace("D:\\pupple\\springRepo\\team5final\\team5\\src\\main\\webapp", "http://127.0.0.1:8080/app");
		imgVo.setImagePath(str);
		return dao.insertImg(sst, imgVo);
	}
	// 이미지 시퀀스넘버 조회
	public String selectImageSeqNo() {
		return dao.selectImageSeqNo(sst);
	}
	//게시글 작성
	public int write(AdoptionNewsVo vo) {
		return dao.write(sst, vo);
	}
	

	// 입양 후 소식 작성
	public int newsImageWrite(AdoptionNewsVo vo) {
		
		String str = vo.getImagePath().replace("D:\\pupple\\springRepo\\team5final\\team5\\src\\main\\webapp", "http://127.0.0.1:8080/app");
		vo.setImagePath(str);
		
//		if (vo.getTitle().length() < 1) {
//			throw new IllegalStateException();
//		}
		return dao.newsImageWrite(sst, vo);
	}

	// 입양 후 소식 목록
	public List<AdoptionNewsVo> list() {
		List<AdoptionNewsVo> newsList = dao.list(sst);
		// imagePath 설정
		for (AdoptionNewsVo news : newsList) {
			String imagePath = news.getImageNo().replace("D:\\pupple\\springRepo\\team5final\\team5\\src\\main\\webapp", "http://127.0.0.1:8080/app");
			news.setImagePath(imagePath);
		}
		return dao.list(sst);
	}

	// 입양 후 소식 상세 조회
	public AdoptionNewsVo detail(AdoptionNewsVo vo) {
		return dao.detail(sst, vo);
	}

	// 입양 후 소식 수정
	public int edit(AdoptionNewsVo vo) {
		if (vo != null && vo.getTitle() != null && vo.getTitle().length() < 1) {
			throw new IllegalStateException("제목 너무 짧음 ...");
		}
		return dao.edit(sst, vo);
	}

	// 입양 후 소식 삭제
	public int delete(String no) {
		return dao.delete(sst, no);
	}



	

	
}
