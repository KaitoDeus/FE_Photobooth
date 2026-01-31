// ============================================
// Internationalization (i18n) - Translations
// ============================================

import type { Language } from '../types';

/**
 * Translation dictionary for all supported languages
 */
const viTranslations = {
    welcome: {
      cta: "BẮT ĐẦU CHỤP ẢNH",
      helper: "Không cần đăng nhập – Ảnh không lưu trực tuyến",
      touch: "Chạm màn hình hoặc nhấn",
      space: "Phím Cách",
      toStart: "để bắt đầu"
    },
    mode: {
      step: "Bước 1 / 3",
      title: "Chọn Chế Độ",
      headline: "Chọn Kiểu Chụp",
      subhead: "Chạm vào thẻ để chọn bố cục ảnh",
      single: "Ảnh lẻ",
      singleDesc: "Độ phân giải cao",
      strip: "Ảnh dài",
      stripDesc: "3 Ảnh • Kiểu Hàn Quốc",
      grid: "Lưới 2x2",
      gridDesc: "4 Ảnh • Bố cục vuông",
      gif: "GIF / Video",
      gifDesc: "Video ngắn lặp lại",
      continue: "Tiếp Tục"
    },
    camera: {
      step: "Cài Đặt Camera",
      titleReady: "Sẵn sàng",
      titleAction: "chụp ảnh chưa?",
      desc: "Cho phép truy cập camera để tiếp tục. Chúng tôi đảm bảo quyền riêng tư của bạn.",
      allowBtn: "CHO PHÉP CAMERA",
      helpTitle: "Không thấy thông báo?",
      helpDesc: "Kiểm tra biểu tượng ổ khóa trên thanh địa chỉ trình duyệt để mở khóa camera nếu bạn lỡ từ chối.",
      connecting: "Đang kết nối...",
      waiting: "Đang chờ cấp quyền..."
    },
    live: {
      title: "Photo Booth",
      preview: "Xem Trước",
      poseGuide: "Gợi ý dáng",
      filters: "Bộ lọc",
      frames: "Khung",
      mode: "Chế độ",
      settings: "Cài đặt"
    },
    effects: {
      title: "Chỉnh Hiệu Ứng",
      active: "Bộ Lọc Đang Chọn",
      reset: "Đặt lại",
      cancel: "Hủy",
      apply: "Áp dụng"
    },
    countdown: {
      shot: "Ảnh",
      getReady: "Sẵn sàng...",
      flash: "CHỤP!"
    },
    review: {
      session: "Phiên",
      title: "Ảnh thế nào?",
      subtitle: "Xem lại ảnh vừa chụp",
      retake: "CHỤP LẠI",
      accept: "CHỌN ẢNH",
      instruction: "Nhấn Enter để chọn • Esc để chụp lại"
    },
    actions: {
      title: "Ảnh Đã Sẵn Sàng!",
      subtitle: "Ảnh đẹp lắm! Chọn tùy chọn bên dưới.",
      selectSize: "Chọn Kích Thước",
      strip: "Dải 2 x 6",
      copies: "Số Lượng In",
      printBtn: "IN NGAY",
      download: "Tải Ảnh Về",
      downloadDesc: "Lưu vào thiết bị này",
      qr: "Lấy Mã QR",
      qrDesc: "Quét để chia sẻ ngay",
      retake: "Chụp Lại"
    },
    qr: {
      title: "Quét để lấy ảnh!",
      desc: "Sử dụng camera điện thoại để quét mã bên dưới.",
      close: "Đóng"
    },
    thankYou: {
      title: "CẢM ƠN BẠN",
      subtitle: "Đang in ảnh...",
      subtitle2: "Chúc bạn ưng ý!",
      seconds: "Giây",
      autoReturn: "Tự động quay về trang chủ",
      shootAgain: "CHỤP TIẾP"
    },
    common: {
      loading: "Đang tải...",
      error: "Đã có lỗi xảy ra",
      retry: "Thử lại",
      back: "Quay lại",
      next: "Tiếp tục",
      cancel: "Hủy",
      confirm: "Xác nhận",
      save: "Lưu",
      delete: "Xóa",
    },
    // Landing Pages
    navbar: {
      home: "Trang Chủ",
      features: "Tính Năng",
      about: "Giới Thiệu",
      instructions: "Hướng Dẫn",
      enterBooth: "Vào Booth",
      login: "Đăng nhập"
    },
    footer: {
      tagline: "Chụp ảnh kỷ niệm ngay trên trình duyệt",
      quickLinks: "Liên kết nhanh",
      legal: "Pháp lý",
      privacy: "Chính sách bảo mật",
      terms: "Điều khoản sử dụng",
      cookies: "Cài đặt Cookie",
      rights: "Đã đăng ký bản quyền."
    },
    home: {
      badge: "🎉 Không cần cài đặt",
      heroTitle: "Bắt Trọn Khoảnh Khắc.",
      heroHighlight: "Ngay Tức Thì.",
      heroDesc: "Trải nghiệm photo booth trực tuyến hoàn hảo. Chụp, chỉnh sửa và chia sẻ kỷ niệm chỉ trong vài giây – không cần tải ứng dụng.",
      startBtn: "Bắt Đầu Chụp",
      watchDemo: "Source Code",
      featuresTitle: "Tính Năng Hấp Dẫn",
      featuresDesc: "Mọi thứ bạn cần để tạo nên những bức ảnh đáng nhớ, ngay trên trình duyệt.",
      feature1Title: "Xóa Phông AI",
      feature1Desc: "Thay nền một cách tự nhiên mà không cần màn xanh.",
      feature2Title: "Bộ Lọc & Sticker Thời Thượng",
      feature2Desc: "Truy cập hàng trăm sticker, khung và bộ lọc màu.",
      feature3Title: "Chia Sẻ Qua QR",
      feature3Desc: "Quét mã QR để nhận ảnh ngay trên điện thoại.",
      whyTitle: "Tại Sao Chọn",
      whyHighlight: "PHOTObooth?",
      why1Title: "Không Cần Cài Đặt",
      why1Desc: "Chỉ cần mở trình duyệt và cho phép camera. Không cần phần mềm.",
      why2Title: "Bảo Mật Riêng Tư",
      why2Desc: "Ảnh được xử lý ngay trên trình duyệt, không lưu trữ trừ khi bạn muốn.",
      why3Title: "Độ Phân Giải Cao",
      why3Desc: "Xuất ảnh chất lượng cao phù hợp để in hoặc đăng mạng xã hội.",
      testimonialsTitle: "Được Tin Dùng Bởi Các Nhóm & Event Planner",
      ctaTitle: "Sẵn sàng tạo dáng chưa?",
      ctaDesc: "Không cần đăng ký. Vào booth và bắt đầu tạo kỷ niệm ngay.",
      ctaBtn: "Mở Booth Miễn Phí"
    },
    about: {
      heroTitle: "Về PHOTObooth",
      heroDesc: "Sứ mệnh của chúng tôi là mang niềm vui chụp ảnh đến mọi người, mọi nơi.",
      storyTitle: "Câu Chuyện Của Chúng Tôi",
      storyP1: "PHOTObooth ra đời từ ý tưởng đơn giản: làm sao để mọi người có thể chụp ảnh kỷ niệm một cách dễ dàng và thú vị nhất?",
      storyP2: "Chúng tôi tin rằng kỷ niệm không nên bị giới hạn bởi thiết bị hay ứng dụng phức tạp. Vì vậy, chúng tôi xây dựng photo booth hoạt động hoàn toàn trên trình duyệt.",
      visionTitle: "Tầm Nhìn Của Chúng Tôi",
      visionDesc: "Trở thành nền tảng photo booth trực tuyến hàng đầu, phục vụ hàng triệu sự kiện từ tiệc sinh nhật đến hội nghị doanh nghiệp.",
      valuesTitle: "Giá Trị Cốt Lõi",
      value1Title: "Đơn Giản",
      value1Desc: "Trải nghiệm mượt mà, không phức tạp.",
      value2Title: "Sáng Tạo",
      value2Desc: "Công cụ giúp bạn thể hiện cá tính.",
      value3Title: "Bảo Mật",
      value3Desc: "Quyền riêng tư của bạn là ưu tiên hàng đầu.",
      statsTitle: "Con Số Ấn Tượng",
      stat1: "Ảnh Đã Chụp",
      stat2: "Người Dùng Hài Lòng",
      stat3: "Sự Kiện",
      stat4: "Quốc Gia"
    },
    team: {
      heroTitle: "Gặp Gỡ Đội Ngũ",
      heroDesc: "Những người đứng sau PHOTObooth",
      member1Name: "Nguyễn Văn A",
      member1Role: "Founder & CEO",
      member1Bio: "10+ năm kinh nghiệm trong lĩnh vực công nghệ. Đam mê tạo ra sản phẩm giúp cuộc sống thú vị hơn.",
      member2Name: "Trần Thị B",
      member2Role: "Lead Designer",
      member2Bio: "Chuyên gia UI/UX với niềm đam mê tạo ra trải nghiệm người dùng xuất sắc.",
      member3Name: "Lê Văn C",
      member3Role: "Tech Lead",
      member3Bio: "Kỹ sư phần mềm với chuyên môn về web technologies và AI.",
      contactTitle: "Liên Hệ Với Chúng Tôi",
      contactDesc: "Có câu hỏi? Chúng tôi luôn sẵn sàng lắng nghe.",
      emailBtn: "Gửi Email"
    },
    features: {
      heroTitle: "Tính Năng & Thông Số Kỹ Thuật",
      heroDesc: "Khám phá tất cả những gì PHOTObooth có thể làm",
      modesTitle: "Chế Độ Chụp",
      modesSingle: "Ảnh Đơn",
      modesSingleDesc: "1 ảnh chất lượng cao",
      modesStrip: "Ảnh Dải",
      modesStripDesc: "3 ảnh xếp dọc kiểu Hàn Quốc",
      modesGrid: "Lưới Ảnh",
      modesGridDesc: "4 ảnh bố cục 2x2",
      modesGif: "GIF / Boomerang",
      modesGifDesc: "Video ngắn lặp lại vui nhộn",
      aiTitle: "Tính Năng AI",
      aiBg: "Xóa/Thay Nền",
      aiBgDesc: "Tự động xóa nền và thay bằng hình ảnh tùy chọn",
      aiFilters: "Bộ Lọc Thông Minh",
      aiFiltersDesc: "Áp dụng các preset chỉnh màu chuyên nghiệp",
      aiStickers: "Sticker & Khung",
      aiStickersDesc: "Thư viện sticker và khung đa dạng",
      shareTitle: "Tùy Chọn Chia Sẻ",
      shareQr: "Mã QR",
      shareQrDesc: "Quét để nhận ảnh ngay trên điện thoại",
      shareDownload: "Tải Về",
      shareDownloadDesc: "Lưu ảnh chất lượng cao về thiết bị",
      sharePrint: "In Ảnh",
      sharePrintDesc: "Kết nối máy in để in ảnh ngay",
      techTitle: "Yêu Cầu Kỹ Thuật",
      techBrowser: "Trình Duyệt Hỗ Trợ",
      techBrowserDesc: "Chrome, Firefox, Safari, Edge (phiên bản mới nhất)",
      techCamera: "Camera",
      techCameraDesc: "Webcam hoặc camera tích hợp",
      techConnection: "Kết Nối",
      techConnectionDesc: "Không bắt buộc (xử lý offline)"
    },
    instructions: {
      heroTitle: "Hướng Dẫn Sử Dụng PHOTObooth",
      heroDesc: "Làm theo các bước đơn giản sau để tạo những bức ảnh tuyệt vời",
      stepsTitle: "Hướng Dẫn Từng Bước",
      step1Title: "Mở Ứng Dụng",
      step1Desc: "Nhấp 'Vào Booth' hoặc đến trang chào mừng để bắt đầu phiên chụp ảnh.",
      step2Title: "Chọn Chế Độ",
      step2Desc: "Chọn từ Ảnh Đơn, Ảnh Dải, Lưới hoặc chế độ GIF tùy theo nhu cầu.",
      step3Title: "Cho Phép Camera",
      step3Desc: "Cấp quyền camera khi được yêu cầu. Quyền riêng tư của bạn được bảo vệ.",
      step4Title: "Tạo Dáng",
      step4Desc: "Sử dụng xem trước trực tiếp để định vị bản thân. Áp dụng bộ lọc nếu muốn.",
      step5Title: "Chụp & Xem Lại",
      step5Desc: "Nhấn nút chụp. Xem lại ảnh và chụp lại nếu cần.",
      step6Title: "Chia Sẻ hoặc In",
      step6Desc: "Tải về, quét mã QR hoặc in ảnh ngay lập tức.",
      tipsTitle: "Mẹo Hay",
      tip1: "Ánh sáng tốt tạo ra sự khác biệt lớn! Hướng về cửa sổ hoặc nguồn sáng để có kết quả tốt nhất.",
      tip2: "Sử dụng tính năng hẹn giờ để có thời gian tạo dáng hoàn hảo.",
      tip3: "Thử các bộ lọc khác nhau để tìm phong cách phù hợp với tâm trạng của bạn.",
      developerTitle: "Nhà Phát Triển",
      developerName: "Võ Anh Khải",
      developerDesc: "Dự án cá nhân thể hiện kỹ năng phát triển React, TypeScript và Spring Boot.",
      ctaBtn: "Bắt Đầu Chụp Ảnh"
    }
};

export const translations = {
  vi: viTranslations,
  en: viTranslations,
} as const;

/**
 * Get translation object for a specific language
 */
export const getTranslation = (lang: Language) => translations[lang];

/**
 * Translation type
 */

export type Translations = typeof translations.vi;

export type TranslationKey = keyof Translations;
