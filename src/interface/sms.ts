export interface ISMS {
  _id: number;
  address: string;
  announcements_subtype: number;
  app_id: number;
  bin_info: number;
  body: string;
  creator: string;
  d_rpt_cnt: number;
  date: number;
  date_sent: number;
  deletable: number;
  error_code: number;
  favorite: number;
  hidden: number;
  locked: number;
  msg_id: number;
  pri: number;
  protocol: number;
  re_type: number;
  read: number; // 1 = read 0 = unread
  reply_path_present: number;
  reserved: number;
  roam_pending: number;
  safe_message: number;
  secret_mode: number;
  seen: number;
  service_center: string;
  sim_slot: number;
  spam_report: number;
  status: number;
  sub_id: number;
  svc_cmd: number;
  teleservice_id: number;
  thread_id: number;
  type: number;
  using_mode: number;
}
