from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = 'miaoyuxuan-secret-key-2024'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///miaoyuxuan.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'jwt-secret-string'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

db = SQLAlchemy(app)
jwt = JWTManager(app)
CORS(app)

# 数据库模型
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Store(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    phone = db.Column(db.String(20))
    city = db.Column(db.String(50))
    district = db.Column(db.String(50))
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    opening_hours = db.Column(db.String(100))
    image_url = db.Column(db.String(200))

class Dish(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(50))
    image_url = db.Column(db.String(200))
    is_recommended = db.Column(db.Boolean, default=False)
    is_spicy = db.Column(db.Boolean, default=False)

class Reservation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    store_id = db.Column(db.Integer, db.ForeignKey('store.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time, nullable=False)
    party_size = db.Column(db.Integer, nullable=False)
    contact_name = db.Column(db.String(50), nullable=False)
    contact_phone = db.Column(db.String(20), nullable=False)
    status = db.Column(db.String(20), default='pending')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class News(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    summary = db.Column(db.String(300))
    image_url = db.Column(db.String(200))
    author = db.Column(db.String(50))
    published_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_featured = db.Column(db.Boolean, default=False)

# API路由
@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'message': '用户名已存在'}), 400
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': '邮箱已被注册'}), 400
    
    user = User(
        username=data['username'],
        email=data['email'],
        password_hash=generate_password_hash(data['password']),
        phone=data.get('phone', '')
    )
    
    db.session.add(user)
    db.session.commit()
    
    return jsonify({'message': '注册成功'}), 201

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    
    if user and check_password_hash(user.password_hash, data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify({
            'access_token': access_token,
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'phone': user.phone
            }
        })
    
    return jsonify({'message': '用户名或密码错误'}), 401

@app.route('/api/stores', methods=['GET'])
def get_stores():
    city = request.args.get('city')
    stores = Store.query.all()
    
    if city:
        stores = Store.query.filter_by(city=city).all()
    
    return jsonify([{
        'id': store.id,
        'name': store.name,
        'address': store.address,
        'phone': store.phone,
        'city': store.city,
        'district': store.district,
        'latitude': store.latitude,
        'longitude': store.longitude,
        'opening_hours': store.opening_hours,
        'image_url': store.image_url
    } for store in stores])

@app.route('/api/dishes', methods=['GET'])
def get_dishes():
    category = request.args.get('category')
    dishes = Dish.query.all()
    
    if category:
        dishes = Dish.query.filter_by(category=category).all()
    
    return jsonify([{
        'id': dish.id,
        'name': dish.name,
        'description': dish.description,
        'price': dish.price,
        'category': dish.category,
        'image_url': dish.image_url,
        'is_recommended': dish.is_recommended,
        'is_spicy': dish.is_spicy
    } for dish in dishes])

@app.route('/api/reservations', methods=['POST'])
@jwt_required()
def create_reservation():
    data = request.get_json()
    user_id = get_jwt_identity()
    
    reservation = Reservation(
        user_id=user_id,
        store_id=data['store_id'],
        date=datetime.strptime(data['date'], '%Y-%m-%d').date(),
        time=datetime.strptime(data['time'], '%H:%M').time(),
        party_size=data['party_size'],
        contact_name=data['contact_name'],
        contact_phone=data['contact_phone']
    )
    
    db.session.add(reservation)
    db.session.commit()
    
    return jsonify({'message': '预订成功', 'reservation_id': reservation.id}), 201

@app.route('/api/reservations', methods=['GET'])
@jwt_required()
def get_reservations():
    user_id = get_jwt_identity()
    reservations = Reservation.query.filter_by(user_id=user_id).all()
    
    return jsonify([{
        'id': res.id,
        'store_id': res.store_id,
        'date': res.date.strftime('%Y-%m-%d'),
        'time': res.time.strftime('%H:%M'),
        'party_size': res.party_size,
        'contact_name': res.contact_name,
        'contact_phone': res.contact_phone,
        'status': res.status,
        'created_at': res.created_at.strftime('%Y-%m-%d %H:%M:%S')
    } for res in reservations])

@app.route('/api/news', methods=['GET'])
def get_news():
    featured = request.args.get('featured')
    news = News.query.order_by(News.published_at.desc()).all()
    
    if featured:
        news = News.query.filter_by(is_featured=True).order_by(News.published_at.desc()).all()
    
    return jsonify([{
        'id': article.id,
        'title': article.title,
        'content': article.content,
        'summary': article.summary,
        'image_url': article.image_url,
        'author': article.author,
        'published_at': article.published_at.strftime('%Y-%m-%d'),
        'is_featured': article.is_featured
    } for article in news])

def init_sample_data():
    """初始化示例数据"""
    # 检查是否已有数据
    if Store.query.first():
        return
    
    # 添加门店数据
    stores = [
        Store(
            name='妙宇轩宴会中心(杰特广场店)',
            address='云南省开远市灵泉西路方圆荟·杰特开远4楼',
            phone='18608805188',
            city='开远市',
            district='灵泉西路',
            opening_hours='10:00-22:00',
            image_url='https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3'
        ),
        Store(
            name='妙宇轩餐厅(金湖东店)',
            address='云南省个旧市金湖东路193号5-6商铺',
            phone='18608805188',
            city='个旧市',
            district='金湖东路',
            opening_hours='10:00-22:00',
            image_url='https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3'
        ),
        Store(
            name='妙宇轩餐厅(迎晖店)',
            address='云南省建水市鸿榆新天地购物中心F3',
            phone='18608805188',
            city='建水市',
            district='迎晖路',
            opening_hours='10:00-22:00',
            image_url='https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3'
        ),
        Store(
            name='妙宇轩餐厅(南湖店)',
            address='云南省蒙自市武庙街1号',
            phone='18608805188',
            city='蒙自市',
            district='武庙街',
            opening_hours='10:00-22:00',
            image_url='https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3'
        ),
        Store(
            name='妙宇轩餐厅(世纪店)',
            address='云南省昆明市官渡区珥季路中段世纪西庄商业中心D幢',
            phone='13988010682',
            city='昆明市',
            district='官渡区',
            opening_hours='10:00-22:00',
            image_url='https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3'
        ),
        Store(
            name='传承馆',
            address='云南省红河哈尼族彝族自治州建水县迎晖路260号',
            phone='13988010682',
            city='建水县',
            district='迎晖路',
            opening_hours='09:00-18:00',
            image_url='https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3'
        ),
        Store(
            name='喜宴宫',
            address='云南省红河州个旧市金湖西路23号豪林新界二幢',
            phone='13988010682',
            city='个旧市',
            district='金湖西路',
            opening_hours='09:00-22:00',
            image_url='https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3'
        )
    ]
    
    # 添加菜品数据
    dishes = [
        Dish(name='过桥米线', description='云南传统名菜，汤鲜味美，营养丰富', price=38.0, category='招牌菜', is_recommended=True, is_spicy=False),
        Dish(name='汽锅鸡', description='云南特色蒸制鸡肉，原汁原味', price=88.0, category='招牌菜', is_recommended=True, is_spicy=False),
        Dish(name='宣威火腿', description='云南宣威特产火腿，香味浓郁', price=68.0, category='地方特色', is_recommended=True, is_spicy=False),
        Dish(name='酸菜鱼', description='酸辣开胃，鱼肉鲜嫩', price=58.0, category='地方特色', is_recommended=False, is_spicy=True),
        Dish(name='野生菌火锅', description='云南野生菌类，营养价值极高', price=128.0, category='传统炖品', is_recommended=True, is_spicy=False),
        Dish(name='红河哈尼梯田红米饭', description='哈尼族传统红米，营养健康', price=18.0, category='精品主食', is_recommended=False, is_spicy=False),
        Dish(name='建水烧豆腐', description='建水特色小食，外焦内嫩', price=25.0, category='特色小食', is_recommended=True, is_spicy=False),
        Dish(name='蒙自年糕', description='蒙自传统糕点，香甜可口', price=22.0, category='特色小食', is_recommended=False, is_spicy=False),
        Dish(name='三七炖鸡汤', description='云南三七药材炖制，滋补养生', price=98.0, category='养生汤品', is_recommended=True, is_spicy=False),
        Dish(name='时令蔬菜拼盘', description='当季新鲜蔬菜，清爽健康', price=32.0, category='时令蔬菜', is_recommended=False, is_spicy=False)
    ]
    
    # 添加新闻数据
    news_articles = [
        News(
            title='妙宇轩传统抓周礼仪服务正式启动',
            content='妙宇轩餐饮连锁集团正式推出传统抓周礼仪服务，为宝宝的成长里程碑增添仪式感...',
            summary='传承中华传统文化，为宝宝成长增添仪式感',
            author='妙宇轩品牌部',
            is_featured=True,
            image_url='https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3'
        ),
        News(
            title='红河州地方特色菜品文化节成功举办',
            content='妙宇轩联合红河州文化部门举办地方特色菜品文化节，展示一地一特色的饮食文化...',
            summary='展示地方特色，传承饮食文化',
            author='妙宇轩文化部',
            is_featured=True,
            image_url='https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3'
        ),
        News(
            title='家和文化主题餐厅设计理念分享',
            content='妙宇轩以"家和"为主旨，打造温馨和谐的用餐环境，传递家的温暖...',
            summary='以家和为主旨，营造温馨用餐环境',
            author='妙宇轩设计部',
            is_featured=True,
            image_url='https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3'
        )
    ]
    
    # 添加到数据库
    for store in stores:
        db.session.add(store)
    
    for dish in dishes:
        db.session.add(dish)
    
    for article in news_articles:
        db.session.add(article)
    
    db.session.commit()
    print("示例数据初始化完成！")

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        init_sample_data()
    
    print("妙宇轩餐饮管理系统后端服务启动中...")
    print("传承中华饮食文化，弘扬家和理念")
    print("服务地址: http://localhost:5000")
    app.run(debug=True, host='0.0.0.0', port=5000) 