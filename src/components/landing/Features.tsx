import React from 'react';
import { Camera, Zap, Heart, Sparkles } from 'lucide-react';
import Reveal from '../common/Reveal';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Camera className="w-8 h-8 text-brand-500" />,
      title: "Phong Cách Hàn Quốc",
      description: "Bộ lọc màu và ánh sáng được thiết kế chuẩn studio Seoul."
    },
    {
      icon: <Zap className="w-8 h-8 text-brand-500" />,
      title: "In Lấy Ngay",
      description: "Nhận ảnh in chất lượng cao chỉ trong chưa đầy 30 giây."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-brand-500" />,
      title: "Phụ Kiện Độc Đáo",
      description: "Hàng trăm mẫu bờm, kính mát và gấu bông cực xinh."
    },
    {
      icon: <Heart className="w-8 h-8 text-brand-500" />,
      title: "Không Gian Riêng",
      description: "Buồng chụp kín đáo, thoải mái tạo dáng không lo ngại ngùng."
    }
  ];

  return (
    <section id="features" className="py-20 bg-brand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Tại Sao Chọn Palette?
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Chúng tôi cung cấp mọi thứ bạn cần để tạo nên những bức ảnh hoàn hảo. Bạn chỉ cần mang theo nụ cười!
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Reveal 
              key={index}
              delay={index * 0.1}
              className="p-8 rounded-[2rem] bg-white border border-brand-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group h-full"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;