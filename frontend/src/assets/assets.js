import item_pic_1 from './item_pic_1.jpg';
import item_pic_2 from './item_pic_2.jpg';
import item_pic_3 from './item_pic_3.webp';
import item_pic_4 from './item_pic_4.gif';
import item_pic_5 from './item_pic_5.jpg';
import item_pic_6 from './item_pic_6.jpg';
import item_pic_7 from './item_pic_7.jpg';
import facebook_icon from './facebook_icon.svg'
import googleplus_icon from './googleplus_icon.svg'
import twitter_icon from './twitter_icon.svg'
import logo from './logo.svg'
import arrow from './arrow.svg'
import logo_light from './logo_light.svg'
import blog_icon from './blog_icon.png'
import add_icon from './add_icon.svg'
import list_icon from './list_icon.svg'
import email_icon from './email_icon.png'
import upload_area from './upload_area.svg'
import user_icon from './user_icon.svg'
import bin_icon from './bin_icon.svg'
import comment_icon from './comment_icon.svg'
import tick_icon from './tick_icon.svg'
import star_icon from './star_icon.svg'
import cross_icon from './cross_icon.svg'
import home_icon from './home_icon.svg'
import gradientBackground from './gradientBackground.png'
import dashboard_icon_1 from './dashboard_icon_1.svg'
import dashboard_icon_2 from './dashboard_icon_2.svg'
import dashboard_icon_3 from './dashboard_icon_3.svg'
import dashboard_icon_4 from './dashboard_icon_4.svg'


export const assets = {
    facebook_icon,
    googleplus_icon,
    twitter_icon,
    logo,
    arrow,
    logo_light,
    blog_icon,
    add_icon,
    email_icon,
    upload_area,
    user_icon,
    bin_icon,
    comment_icon,
    tick_icon,
    star_icon,
    home_icon,
    gradientBackground,
    list_icon,
    cross_icon,
    dashboard_icon_1,
    dashboard_icon_2,
    dashboard_icon_3,
    dashboard_icon_4,
}
export const itemCategories = ['All', 'Electronics', 'ID & Cards', 'Books & Stationery', 'Miscellaneous']

export const Item_data = [
  {
    "_id": "6805ee7dd8f584af5da78d37",
    "title": "Acer Laptop",
    "description": "Black Acer Aspire laptop with stickers on the lid.",
    "category": "Electronics",
    "image": item_pic_1,
    "createdAt": "2025-04-21T07:06:37.508Z",
    "updatedAt": "2025-04-24T08:26:29.750Z",
    "__v": 0,
    "isPublished": true,
    "subTitle": "Found at Library"
  },
  {
    "_id": "6805ee7dd8f584af5da78d38",
    "title": "Water Bottle",
    "description": "Blue Milton water bottle with scratches near the lid.",
    "category": "Miscellaneous",
    "image": item_pic_4,
    "createdAt": "2025-04-22T09:45:12.123Z",
    "updatedAt": "2025-04-22T09:45:12.123Z",
    "__v": 0,
    "isPublished": true,
    "subTitle": "Found near Canteen"
  },
  {
    "_id": "6805ee7dd8f584af5da78d39",
    "title": "Aadhar Card",
    "description": "ID card with name visible, belongs to Rekha ",
    "category": "ID & Cards",
    "image": item_pic_2,
    "createdAt": "2025-04-23T10:12:56.123Z",
    "updatedAt": "2025-04-23T10:12:56.123Z",
    "__v": 0,
    "isPublished": true,
    "subTitle": "Found near Admin Block"
  },
  {
    "_id": "6805ee7dd8f584af5da78d40",
    "title": "Casio Scientific Calculator",
    "description": "Casio fx-991ES calculator with initials 'RK' on the back.",
    "category": "Books & Stationery",
    "image": item_pic_5,
    "createdAt": "2025-04-24T11:30:00.000Z",
    "updatedAt": "2025-04-24T11:30:00.000Z",
    "__v": 0,
    "isPublished": true,
    "subTitle": "Found in Classroom B203"
  },
  {
    "_id": "6805ee7dd8f584af5da78d41",
    "title": "Black Backpack",
    "description": "Backpack containing a notebook and charger.",
    "category": "Books & Stationery",
    "image": item_pic_6,
    "createdAt": "2025-04-25T08:20:10.000Z",
    "updatedAt": "2025-04-25T08:20:10.000Z",
    "__v": 0,
    "isPublished": true,
    "subTitle": "Found near Auditorium"
  },
  {
    "_id": "6805ee7dd8f584af5da78d42",
    "title": "Silver Bracelet",
    "description": "Simple silver bracelet engraved with the initials ‘S.A.’",
    "category": "Miscellaneous",
    "image": item_pic_3,
    "createdAt": "2025-04-26T09:00:00.000Z",
    "updatedAt": "2025-04-26T09:00:00.000Z",
    "__v": 0,
    "isPublished": true,
    "subTitle": "Found at Girls' Hostel"
  },
  {
    "_id": "6805ee7dd8f584af5da78d43",
    "title": "Keychain with Keys",
    "description": "Set of two keys on a keychain.",
    "category": "Keys",
    "image": item_pic_7,
    "createdAt": "2025-04-27T07:40:00.000Z",
    "updatedAt": "2025-04-27T07:40:00.000Z",
    "__v": 0,
    "isPublished": true,
    "subTitle": "Found near Bike Parking Area"
  },
  
   
];
    

export const comments_data = [
        {
            "_id": "6811ed9e7836a82ba747cb25",
            "blog": Item_data[0],
            "name": "Rani Mukarji",
            "content": "This is mine",
            "isApproved": false,
            "createdAt": "2025-04-30T09:30:06.918Z",
            "updatedAt": "2025-04-30T09:30:06.918Z",
            "__v": 0
        },
        {
            "_id": "6810a752fbb942aa7cbf4adb",
            "blog": Item_data[1],
            "name": "John Doe",
            "content": "Please contact me.",
            "isApproved": false,
            "createdAt": "2025-04-29T10:17:54.832Z",
            "updatedAt": "2025-04-29T10:17:54.832Z",
            "__v": 0
        },
        {
            "_id": "680779aebef75c08f8b4898f",
            "blog": Item_data[2],
            "name": "Jack London",
            "content": "Hi! Did anyone claim this?",
            "isApproved": true,
            "createdAt": "2025-04-22T11:12:46.547Z",
            "updatedAt": "2025-04-22T11:13:10.015Z",
            "__v": 0
        },
        {
            "_id": "680770aeb2897e5c28bf9b26",
            "blog": Item_data[3],
            "name": "Sam Smith",
            "content": "Hola! This is mine! I lost it yesterday",
            "isApproved": false,
            "createdAt": "2025-04-22T10:34:22.020Z",
            "updatedAt": "2025-04-22T10:34:22.020Z",
            "__v": 0
        },
        {
            "_id": "68076468e32055c94a696cf5",
            "blog": Item_data[4],
            "name": "Peter Lawrence",
            "content": "Honestly, I did not expect to find it so fast. Thanks a lot!",
            "isApproved": true,
            "createdAt": "2025-04-22T09:42:00.444Z",
            "updatedAt": "2025-04-22T10:24:55.626Z",
            "__v": 0
        }
    ]

export const dashboard_data = {
    "Items": 7,
    "comments": 5,
    "drafts": 0,
    "recentItems": Item_data.slice(0, 5),
}

export const footer_data = [
      {
          title: "Quick Links",
          links: ["Home", "Best Sellers", "Offers & Deals", "Contact Us", "FAQs"]
      },
      {
          title: "Need Help?",
          links: ["Delivery Information", "Return & Refund Policy", "Payment Methods", "Track your Order", "Contact Us"]
      },
      {
          title: "Follow Us",
          links: ["Instagram", "Twitter", "Facebook", "YouTube"]
      }
  ];