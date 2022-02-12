import React from "react";
import { Card } from "antd";
import noImage from '../../images/default.jpg'
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
  // destructure
  const { title, description, images, slug } = product;

  return (
    <Card
      cover={
        <img
          src={images && images.length ? images[0].url : noImage}
          style={{ height: "150px", objectFit: "cover" }}
          className="p-1"
        />
      }
      actions={
          [
              <Link to={`/admin/product/${slug}`}>
                <EditOutlined className="text-warning"/>,
                <DeleteOutlined 
                onClick={() => handleRemove(slug)} 
                className="text-danger"/>
              </Link>
          ]
      }
    >
      <Meta title={title} description={`${description && description.substring(0,10)}...`} />
    </Card>
  );
};

export default AdminProductCard;
