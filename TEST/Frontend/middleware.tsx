import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;

  // 1. Các route public không cần token
  const publicPaths = ['/signin', '/signup', '/forgot-password', '/reset-password'];
  
  // Nếu là trang chủ '/', cho phép truy cập nhưng sẽ handle redirect bên dưới nếu cần
  if (pathname === '/' && !token) {
     return NextResponse.next(); 
  }

  // Nếu đang ở public path
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    // Nếu đã login mà vào signin/signup -> redirect về dashboard tương ứng
    if (token) {
       // Logic redirect thông minh hơn có thể đặt ở đây, tạm thời về home
       return NextResponse.redirect(new URL('/', req.url));
    }
    return NextResponse.next();
  }

  // 2. Các route yêu cầu đăng nhập
  if (!token) {
    const loginUrl = new URL('/signin', req.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Phân quyền dựa trên Role (Decode token basic)
  try {
    // JWT format: header.payload.signature
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    const payload = JSON.parse(jsonPayload);
    const role = payload.role; // 'Admin', 'Doctor', 'Donor'

    // --- RULE 1: DONOR không được vào trang Admin ---
    // Các trang Admin bắt đầu bằng /admin hoặc /blood-inventory
    if (role === 'Donor') {
        const restrictedForDonor = [
            '/adminDashboard', 
            '/admin-appointment', 
            '/admin-blood-inventory', 
            '/admin-user-management', 
            '/admin-report',
            '/record-donation', // Trang nhập liệu cũng cấm Donor
            '/work-schedule'    // Trang lịch làm việc cũng cấm Donor
        ];
        
        if (restrictedForDonor.some(path => pathname.startsWith(path))) {
            return NextResponse.redirect(new URL('/', req.url)); // Về trang chủ Donor
        }
    }

    // --- RULE 2: DOCTOR không được vào User Management ---
    if (role === 'Doctor') {
        if (pathname.startsWith('/admin-user-management')) {
             return NextResponse.redirect(new URL('/adminDashboard', req.url));
        }
    }

  } catch (error) {
    // Token lỗi -> Force logout
    const response = NextResponse.redirect(new URL('/signin', req.url));
    response.cookies.delete('token');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api|assets).*)'],
};