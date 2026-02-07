import React, { useEffect } from 'react';
import Reveal from '../components/common/Reveal';

const PrivacyPolicyPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-brand-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-brand-100">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 border-b-2 border-brand-200 pb-4 inline-block">
            Chính Sách & Miễn Trừ Trách Nhiệm
          </h1>

          <div className="space-y-8 text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-brand-500 mb-4 flex items-center gap-2">
                1. Mục Đích Dự Án
              </h2>
              <p>
                <strong>Photo Palette</strong> là một dự án phần mềm được phát triển bởi <strong>Võ Anh Khải </strong> 
                nhằm mục đích <strong>học tập, nghiên cứu và thực hành kỹ thuật lập trình Web</strong>.
              </p>
              <p className="mt-2">
                Dự án này hoàn toàn <strong>PHI LỢI NHUẬN (NON-COMMERCIAL)</strong>. Chúng tôi không thu bất kỳ khoản phí nào từ người dùng, 
                không chạy quảng cáo, và không sử dụng cho bất kỳ mục đích kinh doanh thương mại nào.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-500 mb-4 flex items-center gap-2">
                2. Miễn Trừ Trách Nhiệm (Disclaimer)
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Mọi hình ảnh, tài nguyên (assets), và ý tưởng thiết kế trong dự án này có thể được tham khảo từ các nguồn mở hoặc cảm hứng từ các ứng dụng Photobooth thực tế (như Photoism, Life4Cut...).
                </li>
                <li>
                  Chúng tôi <strong>không sở hữu bản quyền</strong> đối với các hình ảnh mẫu (nếu có) được sử dụng để minh họa. Nếu bạn là chủ sở hữu bản quyền và muốn gỡ bỏ, vui lòng liên hệ trực tiếp với chúng tôi.
                </li>
                <li>
                  Dự án này <strong>không liên kết</strong> với bất kỳ tổ chức, doanh nghiệp hay thương hiệu Photobooth nào khác.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-500 mb-4 flex items-center gap-2">
                3. Quyền Riêng Tư & Dữ Liệu
              </h2>
              <p>
                Chúng tôi tôn trọng tuyệt đối quyền riêng tư của người dùng:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>
                  <strong>Tất cả hình ảnh được chụp đều được xử lý cục bộ (Client-side) trên trình duyệt của bạn.</strong>
                </li>
                <li>
                  Hệ thống <strong>KHÔNG</strong> lưu trữ, tải lên (upload) hay chia sẻ hình ảnh của bạn lên bất kỳ máy chủ nào.
                </li>
                <li>
                  Sau khi bạn tải ảnh về hoặc đóng tab trình duyệt, dữ liệu sẽ tự động biến mất và chúng tôi không thể khôi phục lại.
                </li>
              </ul>
            </section>

            <section className="bg-brand-50 p-6 rounded-xl border border-brand-100">
              <h2 className="text-xl font-bold text-slate-800 mb-2">Liên Hệ</h2>
              <p className="text-sm">
                Nếu có bất kỳ vấn đề nào liên quan đến bản quyền hoặc nội dung, xin vui lòng liên hệ với tác giả để được giải quyết nhanh chóng:
              </p>
              <div className="mt-4 font-medium flex flex-col gap-1">
                <span>Developer: Võ Anh Khải</span>
                <span>Email: <a href="mailto:khaivo300605@gmail.com" className="text-brand-500 hover:underline">khaivo300605@gmail.com</a></span>
              </div>
            </section>

            <div className="pt-8 border-t border-slate-100 text-center text-slate-400 text-sm italic">
              Cập nhật lần cuối: 07/02/2026
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
