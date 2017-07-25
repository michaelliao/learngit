using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Linq.Expressions;
using Zwj.TEMS.Common;


namespace TEMS.Controls
{
    /// <summary>
    /// 文本框
    /// Author:Wheeky
    /// Url:www.zuowenjun.cn
    /// </summary>
    public partial class CTextBox : UserControl,IZwjDefControl
    {
        [Description("当点击按钮时触发该事件")]
        public event EventHandler OnOpen;

        [Description("当值改变时触发该事件")]
        public event EventHandler OnValueChange;

        public CTextBox()
        {
            InitializeComponent();
            this.DispalyOpenButton = false;
            textBox1.TextChanged += delegate { RaiseValueChange(); };
        }

        private void RaiseValueChange()
        {
            if (this.OnValueChange!=null)
            {
                this.OnValueChange(this, null);
            }
        }

        [Browsable(true)]
        [Description("设置文本框的值")]
        public string Value
        {
            get
            {
                return textBox1.Text;
            }
            set
            {
                textBox1.Text = value;
            }
        }

        [Browsable(true)]
        [Description("设置标签的值")]
        public string Label
        {
            get
            {
                return label1.Text;
            }
            set
            {
                label1.Text = value;
            }
        }

        [Browsable(true)]
        [Description("设置是否显示打开按钮")]
        public bool DispalyOpenButton
        {
            get
            {
                return button1.Visible;
            }
            set
            {
                button1.Visible = value;
                textBox1.ReadOnly = button1.Visible;
            }
        }

        [Browsable(true)]
        [Description("设置是否允许多行")]
        public bool AllowMultiline
        {
            get
            {
               return textBox1.Multiline;
            }
            set
            {
                textBox1.Multiline = value;
                if (textBox1.Multiline)
                {
                    textBox1.ScrollBars = ScrollBars.Vertical;
                }
            }
        }

        [Browsable(true)]
        [Description("设置屏蔽密码的字符")]
        public char PasswordChar
        {
            get
            {
                return textBox1.PasswordChar;
            }
            set
            {
                textBox1.PasswordChar=value;
            }
        }

        public void ValueFor<TEntity>(Expression<Func<TEntity, dynamic>> selectField, string fieldValue, bool displayBtn = false, bool allowMultiline=false) where TEntity : class
        {
            var fieldInfo = General.GetPropertyInfo(selectField);
            this.Label = General.GetDisplayName(fieldInfo);
            this.Value = fieldValue;
            this.DispalyOpenButton = displayBtn;
            this.AllowMultiline = allowMultiline;
        }

        private void button1_Click(object sender, EventArgs e)
        {
            if (this.OnOpen != null)
            {
                this.OnOpen(this, null);
            }
        }
    }
}
