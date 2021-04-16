import styles from "./Header.module.css";
import UserOutlined from "@ant-design/icons/UserOutlined";
import Menu from "antd/lib/menu";
import Dropdown from "antd/lib/dropdown";
import MenuUnfoldOutlined from "@ant-design/icons/MenuUnfoldOutlined";
import { tokenName, userName } from "../../Constant";
import { useRouter } from "next/router";

const DropDownMenu = () => {
  const router = useRouter();

  const logout = () => {
    sessionStorage.removeItem(tokenName);
    router.push("/login");
  };

  return (
    <Menu>
      <Menu.ItemGroup key="g1" title={localStorage.getItem(userName)}>
        <Menu.Divider />
        {/* <Menu.Item key="1">Edit Profile</Menu.Item>
        <Menu.Divider /> */}
        <Menu.Item key="3" onClick={logout}>
          Logout
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );
};
export default function Header({ sideBarOpen }) {
  return (
    <div className={styles.header}>
      <div className={styles.toggle_icon} onClick={sideBarOpen}>
        <MenuUnfoldOutlined />
      </div>
      <div className={styles.title}>
        <h4>SMART DINER Delivery System</h4>
      </div>
      <div>
        <Dropdown overlay={<DropDownMenu />} trigger={["click"]}>
          <UserOutlined
            className={styles.userIcon}
            onClick={(e) => e.preventDefault()}
          />
        </Dropdown>
      </div>
    </div>
  );
}
