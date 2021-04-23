import { Layout, Form, Input, Card, notification } from "antd";
import PrimaryButton from "../Components/PrimaryButton/PrimaryButton";
import styles from "../styles/Login.module.css";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { tokenName, deliveryPartnerRoleID, userName } from "../Constant";
import { useRouter } from "next/router";

const { Content } = Layout;

export default function Login() {
  const router = useRouter();

  const onFinish = (values) => {
    const data = {
      email: values.email,
      password: values.password,
    };
    axios
      .post(`${process.env.NEXT_PUBLIC_DB_BASE_URL}/auth/signin`, data)
      .then((res) => {
        if (Number(res.data.roleId) === deliveryPartnerRoleID) {
          localStorage.setItem(tokenName, res.data.accessToken);
          localStorage.setItem(userName, res.data.username);
          router.push("/");
        }
      })
      .catch((error) => {
        console.log(error);
        notification.error({
          message: "Error! Try Again",
          description: `${error?.response?.data?.message}`,
        });
      });
  };
  return (
    <div className={styles.login_layout}>
      <div className={styles.login_cover}>
        <h1>SMART DINER DELIVERY SYSTEM</h1>
      </div>
      <Layout>
        <Content>
          <Card title="Login" className={styles.login_card}>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Provide a valid email ID",
                  },
                ]}
              >
                <Input
                  size="large"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input
                  size="large"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <PrimaryButton name={"LOGIN"} />
              </Form.Item>
            </Form>
          </Card>
        </Content>
      </Layout>
    </div>
  );
}
