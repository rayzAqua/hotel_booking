import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        maxPeoples: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        photos: {
            type: [String],
        },
        description: {
            type: String,
            required: true
        },
        // roomNumbers là một mảng chứa các đối tượng có các thuộc tính numner và dateBookeds
        // Nếu chỉ định kiểu dữ liệu cho một trường dữ liệu thì có thể dùng number: Number hoặc number: {type: Number} đểu đúng.
        // Vì đây chỉ là một trường chứa 1 giá trị
        // dateBookeds là một mảng chứa nhiều giá trị cho nên không thể viết nó một cách ngắn gọn như sau: dateBookeds: [date: Date].
        // Nếu viết theo cách này thì hệ thống sẽ hiểu dateBookeds là một mảng chỉ chứa một giá trị duy nhất kiểu Date, vì vậy
        // để mảng này có thể lưu được nhiều đối tượng có kiểu Date thì phải định nghĩa một đối tượng có kiểu Date trong mảng. ĐN như sau:
        // dateBookeds: [{type: Date}]
        roomNumbers: [{ number: Number, dateBookeds: { type: [Date] } }]
        /*
         roomNumbers:[
            {number: 100, dateBookeds: [24/03/2023, 25/03/2023, 26/03/2023]},
            {number: 101, dateBookeds: [25/03/2023, 26/03/2023]},
            {number: 102, dateBookeds: [24/03/2023, 25/03/2023]},
            {number: 103, dateBookeds: []},
         ] 
         */
    },
    { timestamps: true }
);

export default mongoose.model("Room", RoomSchema);