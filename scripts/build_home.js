const fs = require('fs');
const { getHead, getNavbar, getFooter } = require('./template_helpers');
const { products } = require('./data');

function renderProductCard(p) {
  return `
    <div class="product-item-card bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition duration-300 flex flex-col justify-between"
         data-wood="${p.wood}" data-load="${p.load}" data-standard="${p.standard}" data-entry="${p.entry}">
      <div>
        <div class="relative h-48 w-full bg-gray-100 overflow-hidden rounded-t-2xl">
          <img src="${p.image}" alt="${p.name}" class="w-full h-48 object-cover group-hover:scale-105 transition duration-500 rounded-t-lg">
          <span class="absolute top-2 left-2 ${p.badgeClass} text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow z-10">
            ${p.badge}
          </span>
          <span class="absolute bottom-2 right-2 bg-black/70 text-white text-[11px] font-medium px-2 py-0.5 rounded backdrop-blur-sm z-10">
            ${p.woodName}
          </span>
        </div>
        <div class="p-4 sm:p-5">
          <div class="flex items-center gap-1.5 text-xs text-amber-700 font-semibold mb-1">
            <i class="fa-solid fa-arrows-up-down-left-right"></i> ${p.entryName}
          </div>
          <h3 class="text-base font-bold text-gray-900 hover:text-brand transition mb-2">
            <a href="${p.slug}">${p.name}</a>
          </h3>
          <div class="text-xs text-gray-600 space-y-1 bg-gray-50 p-2.5 rounded-lg mb-4">
            <div>• Quy cách: <strong>${p.size}</strong></div>
            <div>• Tải trọng: ${p.capacity}</div>
            <div>• Tiêu chuẩn: ${p.standardText}</div>
          </div>
        </div>
      </div>
      <div class="p-4 sm:p-5 pt-0">
        <div class="text-xs text-gray-500 mb-2">Giá tham khảo B2B: <span class="text-brand font-bold text-sm">${p.price}</span></div>
        <div class="grid grid-cols-2 gap-2">
          <button onclick="addToQuoteCart({id:'${p.id}', name:'${p.name}', size:'${p.size}', woodType:'${p.woodName}', loadCapacity:'${p.capacity}', standard:'${p.standardText}', quantity: 100, priceEst:'${p.price}', image:'${p.image}'})"
                  class="bg-emerald-50 hover:bg-emerald-100 text-brand text-xs font-bold py-2.5 rounded-lg transition border border-emerald-200">
            + Báo Giá
          </button>
          <a href="${p.slug}" class="bg-gray-800 hover:bg-black text-white text-xs font-bold py-2.5 rounded-lg text-center transition flex items-center justify-center">
            Chi Tiết
          </a>
        </div>
      </div>
    </div>
  `;
}

function buildIndex() {
  const head = getHead(
    "Xưởng Sản Xuất Pallet Gỗ B2B Giá Gốc | Đạt Chuẩn ISPM 15 Xuất Khẩu",
    "Xưởng sản xuất Pallet Gỗ Keo, Gỗ Thông, Pallet ván ép xuất khẩu trực tiếp giá gốc không qua trung gian. Năng lực 50.000 pallet/tháng, giao nhanh 2-4h tới KCN.",
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Xưởng Sản Xuất Pallet Gỗ Việt B2B",
      "image": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
      "telephone": "0988776655",
      "email": "baogia@palletgoviet.vn",
      "priceRange": "120.000đ - 350.000đ",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Đường Số 6, KCN Sóng Thần 1, Dĩ An",
        "addressLocality": "Bình Dương",
        "addressRegion": "Đông Nam Bộ",
        "postalCode": "820000",
        "addressCountry": "VN"
      }
    }
  );

  const hero = `
  <section class="relative bg-brand-dark text-white overflow-hidden w-full">
    <div class="absolute inset-0 z-0">
      <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=80" alt="Xưởng Pallet Gỗ" class="w-full h-full object-cover opacity-25">
      <div class="absolute inset-0 hero-overlay"></div>
    </div>
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 md:py-24">
      <div class="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
        
        <!-- CỘT TRÁI (W: 7/12) -->
        <div class="w-full lg:w-7/12 pr-0 lg:pr-6 space-y-3.5 sm:space-y-6">
          <div class="inline-flex items-center gap-1.5 sm:gap-2 bg-emerald-900/80 border border-emerald-600/50 px-2.5 sm:px-3.5 py-1 rounded-full text-[10px] sm:text-xs md:text-sm font-semibold text-emerald-300 max-w-full">
            <i class="fa-solid fa-certificate text-amber-400 flex-shrink-0"></i>
            <span class="truncate">TIÊU CHUẨN XUẤT KHẨU ISPM 15 / SẤY HT</span>
          </div>

          <h1 class="text-[19px] xs:text-[22px] sm:text-3xl md:text-4xl lg:text-[38px] font-bold leading-snug tracking-tight text-white mb-2 sm:mb-4">
            <span class="block">Xưởng Sản Xuất Pallet Gỗ Trực Tiếp</span>
            <span class="text-amber-400 block mt-0.5 sm:mt-1">Giá Gốc Không Qua Trung Gian</span>
          </h1>

          <p class="text-white/90 font-normal text-xs sm:text-base md:text-lg leading-relaxed max-w-2xl">
            Cung cấp số lượng lớn <strong>Pallet Gỗ Keo, Gỗ Thông, Pallet Ván Ép, Thùng Gỗ Xuất Khẩu</strong> cho các nhà máy, tập đoàn logistics và kho vận tại KCN Bình Dương, Đồng Nai, TP.HCM, Bắc Ninh. Nhận đóng mẫu theo bản vẽ kỹ thuật riêng.
          </p>

          <div class="space-y-2.5 sm:space-y-4 pt-1 sm:pt-2">
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4">
              <button onclick="openQuickQuoteModal()" class="w-full sm:w-auto bg-brand-accent hover:bg-orange-600 text-white text-sm sm:text-base font-bold px-5 sm:px-7 py-3 sm:py-4 rounded-xl shadow-xl hover:shadow-orange-600/30 transition duration-200 flex items-center justify-center gap-2 sm:gap-3">
                <i class="fa-solid fa-calculator"></i>
                <span>Nhận Báo Giá Sỉ Ngay</span>
              </button>
              <a href="san-pham.html" class="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/30 text-white text-sm sm:text-base font-semibold px-5 sm:px-7 py-3 sm:py-4 rounded-xl backdrop-blur-sm transition duration-200 flex items-center justify-center gap-2">
                <i class="fa-solid fa-list-check"></i>
                <span>Xem Danh Mục Pallet</span>
              </a>
            </div>
            <div>
              <a href="gioi-thieu.html" class="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-300 hover:text-amber-400 font-medium transition underline underline-offset-4">
                <i class="fa-solid fa-file-arrow-down text-amber-400 text-sm sm:text-base"></i>
                <span>Tải Hồ Sơ Năng Lực (.PDF)</span>
              </a>
            </div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 pt-3 sm:pt-6 border-t border-emerald-800/60 text-xs sm:text-sm font-medium text-white">
            <div class="flex items-center gap-1.5"><i class="fa-solid fa-check text-amber-400 flex-shrink-0"></i> <span>Đóng đinh xoắn</span></div>
            <div class="flex items-center gap-1.5"><i class="fa-solid fa-check text-amber-400 flex-shrink-0"></i> <span>Giao nhanh 2-4h</span></div>
            <div class="flex items-center gap-1.5"><i class="fa-solid fa-check text-amber-400 flex-shrink-0"></i> <span>Bản vẽ 3D Free</span></div>
            <div class="flex items-center gap-1.5"><i class="fa-solid fa-check text-amber-400 flex-shrink-0"></i> <span>Hóa đơn VAT</span></div>
          </div>
        </div>

        <!-- CỘT PHẢI (W: 5/12) -->
        <div class="w-full lg:w-5/12">
          <div class="bg-white text-gray-800 rounded-2xl p-4 sm:p-7 shadow-2xl border border-gray-100 overflow-hidden">
            <div class="flex items-center justify-between gap-2 mb-3">
              <div>
                <h3 class="text-base sm:text-xl font-bold text-gray-900 leading-tight">Khảo Sát & Báo Giá B2B</h3>
                <p class="text-[11px] sm:text-xs text-gray-500">Đơn hàng từ 30 cái - Chiết khấu cao</p>
              </div>
              <span class="bg-brand-accent text-white text-[10px] sm:text-xs font-extrabold uppercase px-2.5 py-1 rounded-full shadow-sm flex-shrink-0">
                Phản Hồi 15P
              </span>
            </div>
            <form data-b2b-form="hero-quick-quote" class="space-y-3 sm:space-y-3.5">
              <div>
                <label class="block text-[11px] sm:text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Quy cách Pallet</label>
                <select class="w-full text-xs px-3 py-2 sm:py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand outline-none bg-gray-50">
                  <option value="keo-1210">Pallet Gỗ Keo (1200x1000mm) - Tải 1-2.5 tấn</option>
                  <option value="thong-euro">Pallet Gỗ Thông Euro/EPAL (1200x800mm)</option>
                  <option value="keo-1111">Pallet Gỗ Keo vuông (1100x1100mm)</option>
                  <option value="van-ep">Pallet Ván Ép Plywood xuất khẩu</option>
                  <option value="theo-yeu-cau">Đóng theo bản vẽ kỹ thuật riêng</option>
                </select>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <div>
                  <label class="block text-[11px] sm:text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Số lượng (cái)</label>
                  <input type="number" min="30" placeholder="VD: 200" required class="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand outline-none">
                </div>
                <div>
                  <label class="block text-[11px] sm:text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Số ĐT / Zalo</label>
                  <input type="tel" placeholder="09xx xxx xxx" required class="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand outline-none">
                </div>
              </div>
              <div>
                <label class="block text-[11px] sm:text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">KCN / Nhà máy tiếp nhận</label>
                <input type="text" placeholder="VD: KCN VSIP 1, KCN Amata..." required class="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand outline-none">
              </div>
              <button type="submit" class="w-full bg-brand hover:bg-brand-dark text-white font-bold py-2.5 sm:py-3.5 rounded-xl transition shadow text-xs sm:text-sm">
                <i class="fa-solid fa-paper-plane mr-1"></i> Gửi Yêu Cầu Báo Giá Nhanh
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  </section>
  `;

  const stats = `
  <section class="bg-white border-b border-gray-200 relative z-20 -mt-2 shadow-sm w-full">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 text-center">
        <div class="p-2 bg-gray-50 sm:bg-transparent rounded-xl"><div class="text-xl sm:text-3xl lg:text-4xl font-extrabold text-brand mb-0.5">10.000 m²</div><div class="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-800 uppercase">Diện Tích Nhà Xưởng</div><p class="text-[10px] sm:text-xs text-gray-500 mt-0.5">3 phân xưởng sản xuất</p></div>
        <div class="p-2 bg-gray-50 sm:bg-transparent rounded-xl"><div class="text-xl sm:text-3xl lg:text-4xl font-extrabold text-brand mb-0.5">50.000+</div><div class="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-800 uppercase">Pallet / Tháng</div><p class="text-[10px] sm:text-xs text-gray-500 mt-0.5">Đáp ứng đơn hàng lớn</p></div>
        <div class="p-2 bg-gray-50 sm:bg-transparent rounded-xl"><div class="text-xl sm:text-3xl lg:text-4xl font-extrabold text-brand mb-0.5">ISPM 15</div><div class="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-800 uppercase">Sấy Khử Trùng HT</div><p class="text-[10px] sm:text-xs text-gray-500 mt-0.5">Đóng dấu mộc chuẩn IPPC</p></div>
        <div class="p-2 bg-gray-50 sm:bg-transparent rounded-xl"><div class="text-xl sm:text-3xl lg:text-4xl font-extrabold text-brand-accent mb-0.5">2 - 4 Giờ</div><div class="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-800 uppercase">Giao Hỏa Tốc</div><p class="text-[10px] sm:text-xs text-gray-500 mt-0.5">Xe tải & Cont riêng</p></div>
      </div>
    </div>
  </section>
  `;

  const featured = `
  <section class="py-10 sm:py-16 md:py-20 bg-white w-full">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 sm:mb-12 gap-2 sm:gap-3">
        <div>
          <span class="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand bg-emerald-50 px-2.5 sm:px-3 py-1 rounded-md border border-emerald-200">Danh Mục Chủ Lực</span>
          <h2 class="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 mt-1.5 sm:mt-2 font-display">SẢN PHẨM PALLET GỖ TIÊU CHUẨN & XUẤT KHẨU</h2>
        </div>
        <a href="san-pham.html" class="text-brand hover:text-brand-light font-bold text-xs sm:text-sm flex items-center gap-1.5 group flex-shrink-0">
          <span>Xem tất cả danh mục (20+ mẫu)</span>
          <i class="fa-solid fa-arrow-right transform group-hover:translate-x-1 transition"></i>
        </a>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        ${products.slice(0, 4).map(p => renderProductCard(p)).join('')}
      </div>
    </div>
  </section>
  `;

  const workflow = `
  <section class="py-10 sm:py-16 md:py-20 bg-gray-50 border-t border-b border-gray-200 w-full">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
        <span class="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand bg-emerald-50 px-2.5 sm:px-3 py-1 rounded-md border border-emerald-200">Quy Trình Chuẩn Hóa B2B</span>
        <h2 class="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 mt-1.5 sm:mt-3 font-display">QUY TRÌNH HỢP TÁC & SẢN XUẤT CHUYÊN NGHIỆP</h2>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
        <div class="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 text-center"><div class="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 text-emerald-800 font-bold rounded-full flex items-center justify-center text-base sm:text-lg mx-auto mb-3 sm:mb-4">1</div><h3 class="font-bold text-gray-900 text-sm sm:text-base mb-1 sm:mb-2">Tiếp Nhận Yêu Cầu</h3><p class="text-xs text-gray-600">Khảo sát tải trọng, kệ hàng và xe nâng.</p></div>
        <div class="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 text-center"><div class="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 text-emerald-800 font-bold rounded-full flex items-center justify-center text-base sm:text-lg mx-auto mb-3 sm:mb-4">2</div><h3 class="font-bold text-gray-900 text-sm sm:text-base mb-1 sm:mb-2">Bản Vẽ & Mẫu Thử</h3><p class="text-xs text-gray-600">Thiết kế 2D/3D, gửi pallet mẫu test thực tế.</p></div>
        <div class="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 text-center"><div class="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 text-emerald-800 font-bold rounded-full flex items-center justify-center text-base sm:text-lg mx-auto mb-3 sm:mb-4">3</div><h3 class="font-bold text-gray-900 text-sm sm:text-base mb-1 sm:mb-2">Cưa Xẻ & Đóng Đinh</h3><p class="text-xs text-gray-600">Cưa nhiều lưỡi, bắn đinh xoắn chịu lực.</p></div>
        <div class="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 text-center"><div class="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 text-emerald-800 font-bold rounded-full flex items-center justify-center text-base sm:text-lg mx-auto mb-3 sm:mb-4">4</div><h3 class="font-bold text-gray-900 text-sm sm:text-base mb-1 sm:mb-2">Sấy Nhiệt & ISPM 15</h3><p class="text-xs text-gray-600">Độ ẩm &lt;18%, hun trùng đóng dấu IPPC.</p></div>
        <div class="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 text-center sm:col-span-2 md:col-span-1"><div class="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 text-emerald-800 font-bold rounded-full flex items-center justify-center text-base sm:text-lg mx-auto mb-3 sm:mb-4">5</div><h3 class="font-bold text-gray-900 text-sm sm:text-base mb-1 sm:mb-2">Giao Hàng KCN</h3><p class="text-xs text-gray-600">Giao tận kho bãi, bàn giao chứng từ & VAT.</p></div>
      </div>
    </div>
  </section>
  `;

  const partners = `
  <section class="py-10 sm:py-16 md:py-20 bg-white w-full">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-6 sm:mb-12">
        <span class="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand bg-emerald-50 px-2.5 sm:px-3 py-1 rounded-md border border-emerald-200">Khách Hàng Tiêu Biểu</span>
        <h2 class="text-lg sm:text-2xl font-extrabold text-gray-900 mt-1.5 sm:mt-2 font-display">ĐỐI TÁC DOANH NGHIỆP TẠI CÁC KCN</h2>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 sm:gap-4 text-center font-bold text-gray-400 text-xs sm:text-sm mb-8 sm:mb-12">
        <div class="bg-white p-3.5 sm:p-5 rounded-xl border border-gray-100 shadow-sm hover:border-emerald-200 hover:text-emerald-800 transition-colors tracking-wider flex items-center justify-center">VSIP GROUP</div>
        <div class="bg-white p-3.5 sm:p-5 rounded-xl border border-gray-100 shadow-sm hover:border-emerald-200 hover:text-emerald-800 transition-colors tracking-wider flex items-center justify-center">SÓNG THẦN LOG</div>
        <div class="bg-white p-3.5 sm:p-5 rounded-xl border border-gray-100 shadow-sm hover:border-emerald-200 hover:text-emerald-800 transition-colors tracking-wider flex items-center justify-center">AMATA CORP</div>
        <div class="bg-white p-3.5 sm:p-5 rounded-xl border border-gray-100 shadow-sm hover:border-emerald-200 hover:text-emerald-800 transition-colors tracking-wider flex items-center justify-center">SAMSUNG FDI</div>
        <div class="bg-white p-3.5 sm:p-5 rounded-xl border border-gray-100 shadow-sm hover:border-emerald-200 hover:text-emerald-800 transition-colors tracking-wider flex items-center justify-center">FOXCONN VN</div>
        <div class="bg-white p-3.5 sm:p-5 rounded-xl border border-gray-100 shadow-sm hover:border-emerald-200 hover:text-emerald-800 transition-colors tracking-wider flex items-center justify-center">CP GROUP</div>
      </div>
    </div>
  </section>
  `;

  const output = head + getNavbar('home') + hero + stats + featured + workflow + partners + getFooter();
  fs.writeFileSync('index.html', output, 'utf8');
  console.log('Built index.html');
}

module.exports = { buildIndex, renderProductCard };