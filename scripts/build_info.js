const fs = require('fs');
const { getHead, getNavbar, getFooter } = require('./template_helpers');

function buildGioithieu() {
  const head = getHead(
    "Hồ Sơ Năng Lực Xưởng Sản Xuất Pallet Gỗ Việt | Quy Mô 10.000m2",
    "Năng lực sản xuất 50.000 pallet gỗ/tháng, 4 lò sấy khử trùng nhiệt ISPM 15 HT công suất 500m3/mẻ, hệ thống cưa xẻ nhiều lưỡi và máy đóng đinh xoắn tự động."
  );

  const body = `
  <div class="bg-gray-100 py-3 border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-gray-600 flex items-center gap-2">
      <a href="index.html" class="hover:text-brand"><i class="fa-solid fa-house"></i> Trang chủ</a>
      <span>/</span>
      <span class="text-brand font-bold">Hồ sơ năng lực nhà máy</span>
    </div>
  </div>

  <section class="bg-brand-dark text-white py-16 md:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <span class="text-xs uppercase font-bold text-amber-400 tracking-wider">Hồ Sơ Năng Lực Doanh Nghiệp (Company Capacity)</span>
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display leading-tight mt-1">HỆ THỐNG NHÀ XƯỞNG & DÂY CHUYỀN SẢN XUẤT PALLET GỖ</h1>
      <p class="text-gray-300 text-sm sm:text-base leading-relaxed mt-3 max-w-3xl">Hơn 10 năm sản xuất bao bì và pallet gỗ công nghiệp phụ trợ chuỗi cung ứng logistics toàn quốc.</p>
    </div>
  </section>

  <section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-6 space-y-6">
          <h2 class="text-2xl sm:text-3xl font-extrabold text-gray-900 font-display">3 PHÂN XƯỞNG TỔNG DIỆN TÍCH 10.000M²</h2>
          <p class="text-gray-600 text-sm leading-relaxed">Hệ thống máy cưa nhiều lưỡi công suất 100m³/ngày, 4 lò sấy nhiệt 500m³/mẻ và dây chuyền súng bắn đinh tự động.</p>
          <div class="space-y-2 text-xs sm:text-sm text-gray-700">
            <div class="p-3 bg-gray-50 rounded-xl border border-gray-200">✔ Mã khử trùng ISPM 15 số VN-088 của Cục BVTV</div>
            <div class="p-3 bg-gray-50 rounded-xl border border-gray-200">✔ 100% gỗ Keo & Thông có chứng nhận FSC</div>
            <div class="p-3 bg-gray-50 rounded-xl border border-gray-200">✔ Kiểm soát chất lượng ISO 9001:2015</div>
          </div>
        </div>
        <div class="lg:col-span-6 grid grid-cols-2 gap-4">
          <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80" class="w-full h-48 object-cover rounded-2xl shadow">
          <img src="https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=600&q=80" class="w-full h-48 object-cover rounded-2xl shadow">
        </div>
      </div>
    </div>
  </section>
  `;

  const output = head + getNavbar('about') + body + getFooter();
  fs.writeFileSync('gioi-thieu.html', output, 'utf8');
  console.log('Built gioi-thieu.html');
}

function buildLienhe() {
  const head = getHead(
    "Liên Hệ Xưởng Sản Xuất Pallet Gỗ Việt | Hotline Báo Giá B2B 24/7",
    "Thông tin liên hệ trực tiếp phòng mua hàng, giám đốc xưởng pallet gỗ tại KCN Sóng Thần Bình Dương, KCN Long Thành Đồng Nai và KCN Bắc Ninh."
  );

  const body = `
  <div class="bg-gray-100 py-3 border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-gray-600 flex items-center gap-2">
      <a href="index.html" class="hover:text-brand"><i class="fa-solid fa-house"></i> Trang chủ</a>
      <span>/</span>
      <span class="text-brand font-bold">Liên hệ xưởng</span>
    </div>
  </div>

  <section class="bg-brand-dark text-white py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display">LIÊN HỆ & THAM QUAN NHÀ MÁY SẢN XUẤT</h1>
      <p class="text-gray-300 text-sm mt-2">Quý khách có thể đến trực tiếp xưởng kiểm tra mẫu thử và quy trình sấy nhiệt khử trùng.</p>
    </div>
  </section>

  <section class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div class="lg:col-span-5 space-y-6">
          <div class="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
            <h3 class="font-bold text-gray-900 text-lg">Thông Tin Trực Tiếp</h3>
            <div class="text-xs space-y-2 text-gray-700">
              <div><strong>Hotline GĐ Xưởng:</strong> <a href="tel:0988776655" class="text-brand font-bold">0988.776.655</a></div>
              <div><strong>Email Báo Giá:</strong> baogia@palletgoviet.vn</div>
              <div><strong>Xưởng Bình Dương:</strong> Đường Số 6, KCN Sóng Thần 1, Dĩ An (Sát KCN VSIP 1)</div>
              <div><strong>Xưởng Đồng Nai:</strong> KCN Long Thành, Đồng Nai</div>
              <div><strong>Xưởng Bắc Ninh:</strong> KCN Đại Đồng - Hoàn Sơn, Tiên Du</div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-7">
          <div class="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm">
            <h3 class="text-xl font-bold text-gray-900 mb-1">Gửi Tin Nhắn Nhanh</h3>
            <form data-b2b-form="contact-page-form" class="space-y-4 text-sm mt-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Họ tên người liên hệ *" required class="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-300 outline-none bg-gray-50">
                <input type="tel" placeholder="Số ĐT / Zalo *" required class="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-300 outline-none bg-gray-50">
              </div>
              <textarea rows="4" placeholder="Nội dung yêu cầu báo giá / bản vẽ..." required class="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-300 outline-none bg-gray-50"></textarea>
              <button type="submit" class="w-full bg-brand hover:bg-brand-dark text-white font-bold text-sm py-3.5 rounded-xl transition shadow">Gửi Tin Nhắn Liên Hệ</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  `;

  const output = head + getNavbar('contact') + body + getFooter();
  fs.writeFileSync('lien-he.html', output, 'utf8');
  console.log('Built lien-he.html');
}

module.exports = { buildGioithieu, buildLienhe };