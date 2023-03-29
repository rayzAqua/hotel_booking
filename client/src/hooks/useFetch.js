import { useEffect, useState } from "react";
import axios from "axios";

// Tạo ra hook useFetch để lấy dữ liệu từ API
// Hàm này sẽ gọi đến hook userEffect để cập nhật dữ liệu lại cho biến data khi component đã được render.
// Để cập nhật dữ liệu cho biến data cần sử dụng thêm 1 hook là useState
const useFetch = (url) => {
    // Sử dụng hook useState để cập nhật lại dữ liệu
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    // Có thể sử dụng useEffect khi cần thực hiện một số hành động trên giao diện người dùng sau khi component đã được render 
    // hoặc khi giá trị của một biến hoặc state thay đổi.
    // Trong trường hợp này là cập nhật lại giá trị của biến data
    // Hàm userEffect có thể được chạy lại mỗi khi một giá trị nào đó trong phần phụ thuộc của nó được thay đổi.  
    // Nếu dependencies bị rỗng, useEffect chỉ chạy một lần đầu tiên.

    // Trong trường hợp này, phần phụ thuộc ủa useEffect (phần phụ thuộc là một mảng []) được cung cáp là một mảng chứa url
    // api của server. Mỗi khi giá trị url này thay đổi thì hàm useEffect sẽ được gọi lại và thực hiện lại việc lấy data từ url này.
    useEffect(() => {
        // Tạo ra một hàm bất đồng bộ để lấy dữ liệu từ server từ đường dẫn url
        const fetchData = async () => {
            // Bắt đầu lấy dữ liệu từ api bằng cách set biến loading
            setLoading(true);
            try {
                // axios là một thư viện HTTP dùng để gửi những request từ một ứng dụng web hoặc moble tới server
                // và nhận lại dữ liệu được phản hồi từ server.
                // Đợi lấy dữ liệu từ api bằng phương thức http get của thư viện axios
                const res = await axios.get(url);
                // Sau khi lấy thành công dùng hàm setData cập nhật lại giá trị cho biến data
                setData(res.data);
            } catch (err) {
                setError(err);
            }
            setLoading(false);
        };
        // Gọi hàm fecthData để lấy dữ liệu (Phải gọi thì nó mới được kích hoạt)
        fetchData();
    }, [url]); // [url] là phần mở rộng, mỗi khi giá trị của mảng này thay đổi thì useEffect sẽ được gọi lại

    // Dùng khi muốn lấy lại dữ liệu api
    const reFetch = async () => {
        setLoading(true);
        try {
            const res = await axios.get(url);
            setData(res.data);
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    };

    // Trả về một đối tượng có các thuộc tính: data, loading, error, reFecth
    return {data, loading, error, reFetch};
};

export default useFetch;
