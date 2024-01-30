package com.kh.app.report.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.kh.app.page.vo.PageVo;
import com.kh.app.report.dao.ReportDao;
import com.kh.app.report.vo.ReportVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReportService {

	private final ReportDao dao;
	private final SqlSessionTemplate sst;
	
	
	
	// 게시글 목록 조회
	public List<ReportVo> list(PageVo pvo) {
		return dao.list(sst, pvo); 
	}
	// 전체 게시글 갯수 조회
	public int selectBoardCount() {
		return dao.selectBoardCount(sst);
	}

	
	// 게시글 상세 조회
	public ReportVo detail(ReportVo vo) {
		return dao.detail(sst, vo);
	}
	
	
	// 게시글 작성
	public int write(ReportVo vo) {
		return dao.write(sst, vo);
	}
	// 이미지 업로드
	public int insert(ReportVo imgVo) {			 
		
        String originalString = imgVo.getImagePath();
        int index = originalString.indexOf("\\resources\\upload"); // 기준 문자열의 인덱스를 찾음
        
        if (index != -1) {
            String leftSubstring = originalString.substring(0, index);
            // "C:\\dev\\team5Repo\\springRepo\\team5final\\team5\\src\\main\\webapp"
            String str = imgVo.getImagePath().replace(leftSubstring
            		, "http://127.0.0.1:8080/app");
            
            imgVo.setImagePath(str);
        }
		return dao.insertImg(sst, imgVo);
	}
	// 이미지 시퀀스넘버 조회
	public String selectImageSeqNo() {
		return dao.selectImageSeqNo(sst);
	}
	// 게시글 수정
	public int editBoard(ReportVo vo) {
		return dao.editBoard(sst, vo);
	}
	// 이미지 수정
	public int editImage(ReportVo imgVo) {
        String originalString = imgVo.getImagePath();
        int index = originalString.indexOf("\\resources\\upload"); // 기준 문자열의 인덱스를 찾음
        
        if (index != -1) {
            String leftSubstring = originalString.substring(0, index);
            // "C:\\dev\\team5Repo\\springRepo\\team5final\\team5\\src\\main\\webapp"
            String str = imgVo.getImagePath().replace(leftSubstring
            		, "http://127.0.0.1:8080/app");
            
            imgVo.setImagePath(str);
        }
        return dao.editImage(sst, imgVo);
	}
	// 게시글 삭제
	public int delete(ReportVo vo) {
		return dao.delete(sst, vo);
	}

} // class
