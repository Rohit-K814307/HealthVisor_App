def paramizer(param):
    result = []
    for val in param.split(','):
        if val:
            result.append(val)
    return result