export interface Member {
  id: string;
  name: string;
  position: string;
  /** 학번 앞 2자리(입학년도)만 노출. 예: "24" */
  admissionYear: string;
  department: string;
}
