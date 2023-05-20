from calculator import Sub

def test_sub():
    s = Sub()
    assert(s.sub(5, 2) == 3)